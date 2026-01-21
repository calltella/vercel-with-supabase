'use client';

export default function Home() {
  const sendMail = async () => {
    const res = await fetch('/api/test-mail', {
      method: 'POST',
    });

    const data = await res.json();
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <main className="p-8">
      <button
        onClick={sendMail}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        テストメール送信
      </button>
    </main>
  );
}
