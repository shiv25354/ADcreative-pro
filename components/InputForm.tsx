
import React, { useState } from 'react';
import { AdType, UGCStyle, UserInput } from '../types';
import { useCampaign } from '../context/CampaignContext';

const InputForm: React.FC = () => {
  const { generateCampaign, isLoading } = useCampaign();
  const [formData, setFormData] = useState<UserInput>({
    experience: '',
    productLink: '',
    category: '',
    adType: AdType.UGC,
    ugcStyle: UGCStyle.PROBLEM_SOLUTION,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setFormData({ ...formData, imageFile: base64 });
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateCampaign(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="material-card p-10 space-y-8 border border-gray-100">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Tell us about the user experience</label>
        <textarea
          required
          placeholder="e.g., 'After using this moisturizer for 3 days, my redness completely vanished. I feel confident for the first time in years...'"
          className="w-full h-36 input-google p-4 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none text-gray-900 bg-gray-50/50"
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
        />
        <p className="text-xs text-gray-400">Be descriptive—the AI uses these feelings to craft the script hooks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Product Category</label>
          <input
            type="text"
            required
            placeholder="e.g. Health & Wellness"
            className="w-full input-google bg-gray-50/50 text-gray-900"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Ad Format</label>
          <select
            className="w-full input-google bg-gray-50/50 text-gray-900 appearance-none cursor-pointer"
            value={formData.adType}
            onChange={(e) => setFormData({ ...formData, adType: e.target.value as AdType })}
          >
            {Object.values(AdType).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {formData.adType === AdType.UGC && (
        <div className="space-y-4 pt-2">
          <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            Creative Production Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.values(UGCStyle).map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setFormData({ ...formData, ugcStyle: style })}
                className={`px-4 py-3 rounded border text-xs font-medium transition-all text-center flex flex-col items-center justify-center gap-2 h-16 ${
                  formData.ugcStyle === style 
                    ? 'bg-blue-50 border-blue-600 text-blue-700 ring-1 ring-blue-600' 
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Direct Product URL</label>
        <input
          type="url"
          required
          placeholder="https://yourstore.com/product"
          className="w-full input-google bg-gray-50/50 text-gray-900"
          value={formData.productLink}
          onChange={(e) => setFormData({ ...formData, productLink: e.target.value })}
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-100">
        <label className="text-sm font-medium text-gray-700">Reference Visual (Optional)</label>
        <div className="flex items-center gap-6">
          <label className="btn-outline px-6 py-2.5 text-sm cursor-pointer inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            Upload Photo
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
          {imagePreview && (
            <div className="w-14 h-14 rounded-md overflow-hidden border border-gray-200 ring-2 ring-blue-50">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
          {!imagePreview && <span className="text-xs text-gray-400 italic">No image selected.</span>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 btn-primary text-base flex justify-center items-center gap-3 ${
          isLoading ? 'opacity-70 cursor-not-allowed grayscale' : ''
        }`}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating AI Strategy...
          </>
        ) : 'Generate Campaign Strategy'}
      </button>
    </form>
  );
};

export default InputForm;
