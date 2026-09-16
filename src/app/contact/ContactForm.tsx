'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '記事・攻略内容について',
    subject: '',
    message: '',
    botCheck: '', // スパム対策用ハニーポット
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
        '530b5503-9c8a-440f-a96d-affe827029ba';

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: `【にこ太郎の格ゲーLAB】[${formData.category}] ${formData.subject}`,
          message: `【お問い合わせ種別】: ${formData.category}\n【お名前】: ${formData.name}\n【返信先メールアドレス】: ${formData.email}\n【件名】: ${formData.subject}\n\n【本文】:\n${formData.message}`,
          from_name: 'にこ太郎の格ゲーLAB お問い合わせフォーム',
          botcheck: formData.botCheck,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          category: '記事・攻略内容について',
          subject: '',
          message: '',
          botCheck: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(data.message || '送信に失敗しました。時間をおいて再試行してください。');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('通信エラーが発生しました。ネットワーク環境をご確認の上、再度お試しください。');
    }
  };

  return (
    <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-10 shadow-sm transition-colors">
      {status === 'success' ? (
        <div className="py-10 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
              送信が完了いたしました
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md mx-auto">
              お問い合わせいただき誠にありがとうございます。内容を確認のうえ、ご入力いただいたメールアドレス宛に折り返しご連絡いたします。
            </p>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all cursor-pointer"
            >
              別のお問い合わせを送る
            </button>
            <Link
              href="/"
              className="px-6 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-sm text-center"
            >
              トップページへ戻る
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* スパム対策用（非表示ハニーポット） */}
          <input
            type="text"
            name="botCheck"
            value={formData.botCheck}
            onChange={handleChange}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* エラー表示 */}
          {status === 'error' && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-start gap-3 text-rose-700 dark:text-rose-300 text-xs leading-relaxed animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">送信エラー</span>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* お名前 */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-900 dark:text-white">
                お名前 <span className="text-rose-600 dark:text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="例：格ゲー太郎"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-900 dark:text-white text-xs placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-800 transition-all"
              />
            </div>

            {/* メールアドレス */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-900 dark:text-white">
                返信先メールアドレス <span className="text-rose-600 dark:text-rose-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="例：player@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-900 dark:text-white text-xs placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-800 transition-all"
              />
            </div>
          </div>

          {/* お問い合わせ種別 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-900 dark:text-white">
              お問い合わせ種別 <span className="text-rose-600 dark:text-rose-400">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-900 dark:text-white text-xs focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-800 transition-all cursor-pointer"
            >
              <option value="記事・攻略内容について">記事・攻略内容について</option>
              <option value="ご意見・ご要望・誤字等のご指摘">ご意見・ご要望・誤字等のご指摘</option>
              <option value="プレミアム会員・解約について">プレミアム会員・解約について</option>
              <option value="取材・執筆・ビジネスのご相談">取材・執筆・ビジネスのご相談</option>
              <option value="その他">その他</option>
            </select>
          </div>

          {/* 件名 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-900 dark:text-white">
              件名 <span className="text-rose-600 dark:text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="例：リュウ攻略記事についての質問"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-900 dark:text-white text-xs placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-800 transition-all"
            />
          </div>

          {/* 本文 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-900 dark:text-white">
              お問い合わせ内容 <span className="text-rose-600 dark:text-rose-400">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              placeholder="お問い合わせ内容を具体的にご記入ください。"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-900 dark:text-white text-xs placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-400 focus:bg-white dark:focus:bg-neutral-800 transition-all resize-y leading-relaxed"
            />
          </div>

          {/* 個人情報取り扱い注意 */}
          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-800 flex items-start gap-2.5 text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
            <p>
              ご入力いただいたメールアドレスおよび個人情報は、お問い合わせへの回答・連絡の目的にのみ使用し、第三者への開示・提供は行いません。
            </p>
          </div>

          {/* 送信ボタン */}
          <div className="pt-2 flex justify-center">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer hover:scale-[1.01] active:scale-95"
            >
              {status === 'submitting' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 dark:border-neutral-900/30 border-t-white dark:border-t-neutral-900 rounded-full animate-spin" />
                  <span>送信中...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>お問い合わせを送信する</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
