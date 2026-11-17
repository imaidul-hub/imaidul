const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
admin.initializeApp();

// ⚠️ region অবশ্যই আপনার Firestore ডাটাবেসের লোকেশনের সাথে মিলতে হবে (যেমন asia-south1)
exports.notifyProxy = onDocumentCreated({ document: 'proxies/{id}', region: 'asia-south1' }, async (event) => {
  const p = event.data.data();
  const db = admin.firestore();

  const tokensSnap = await db.collection('tokens').where('teacherId', '==', p.subId).get();
  const tokens = tokensSnap.docs.map(d => d.id);
  if (!tokens.length) return;

  let absent = '';
  if (p.absentId) {
    const a = await db.collection('teachers').doc(p.absentId).get();
    absent = a.exists ? a.data().name : '';
  }
  const body = `${p.date} • ${p.period}ম পিরিয়ড • ${p.class} (${p.subject})` + (absent ? ` • ${absent}-এর পরিবর্তে` : '') + (p.room ? ` • রুম ${p.room}` : '');

  const res = await admin.messaging().sendEachForMulticast({
    tokens,
    notification: { title: '🔁 নতুন প্রক্সি ক্লাস', body },
    webpush: { fcmOptions: { link: `https://${process.env.GCLOUD_PROJECT}.web.app/teacher.html` } }
  });

  // অকেজো টোকেন মুছে ফেলা
  const dead = [];
  res.responses.forEach((r, i) => {
    const c = r.error && r.error.code;
    if (!r.success && (c === 'messaging/registration-token-not-registered' || c === 'messaging/invalid-registration-token')) dead.push(tokens[i]);
  });
  await Promise.all(dead.map(t => db.collection('tokens').doc(t).delete()));
});


