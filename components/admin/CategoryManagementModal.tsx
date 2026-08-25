'use client';

import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  FolderPlus, 
  Edit3, 
  Trash2, 
  Check
} from 'lucide-react';
import { CategoryItem } from '@/lib/types';
import { useApp } from '@/context/AppContext';

interface CategoryManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMOJI_PRESETS = ['🌿', '🍯', '💧', '🏺', '🌾', '🌱', '📦', '🍷', '💊', '🍃', '✨', '🧪', '🫖', '🌸', '🧴', '🔥'];

const COLOR_PRESETS = [
  { label: 'Emerald Green', value: 'bg-[#f0faf4] text-[#00873E]' },
  { label: 'Amber Gold', value: 'bg-amber-100 text-amber-900' },
  { label: 'Teal Blue', value: 'bg-teal-100 text-teal-800' },
  { label: 'Cyan Aqua', value: 'bg-cyan-100 text-cyan-800' },
  { label: 'Orange Terracotta', value: 'bg-orange-100 text-orange-900' },
  { label: 'Purple Royal', value: 'bg-purple-100 text-purple-800' },
  { label: 'Rose Red', value: 'bg-rose-100 text-rose-800' },
  { label: 'Stone Slate', value: 'bg-stone-200 text-stone-800' }
];

export default function CategoryManagementModal({
  isOpen,
  onClose
}: CategoryManagementModalProps) {
  const { categories, products, addCategory, updateCategory, deleteCategory, showToast } = useApp();

  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [slugId, setSlugId] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [nameUr, setNameUr] = useState('');
  const [icon, setIcon] = useState('🌿');
  const [description, setDescription] = useState('');
  const [descriptionUrdu, setDescriptionUrdu] = useState('');
  const [badgeColor, setBadgeColor] = useState('bg-[#f0faf4] text-[#00873E]');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setSlugId('');
    setNameEn('');
    setNameUr('');
    setIcon('🌿');
    setDescription('');
    setDescriptionUrdu('');
    setBadgeColor('bg-[#f0faf4] text-[#00873E]');
    setEditingCatId(null);
    setShowAddForm(false);
  };

  const handleStartEdit = (cat: CategoryItem) => {
    setEditingCatId(cat.id);
    setSlugId(cat.id);
    setNameEn(cat.nameEn);
    setNameUr(cat.nameUr);
    setIcon(cat.icon || '🌿');
    setDescription(cat.description || '');
    setDescriptionUrdu(cat.descriptionUrdu || '');
    setBadgeColor(cat.badgeColor || 'bg-[#f0faf4] text-[#00873E]');
    setShowAddForm(true);
  };

  const handleNameEnChange = (val: string) => {
    setNameEn(val);
    if (!editingCatId) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlugId(generated);
    }
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn.trim() || !nameUr.trim()) {
      showToast('Please provide category names in both English and Urdu.');
      return;
    }
    if (!slugId.trim()) {
      showToast('Please provide a category identifier slug.');
      return;
    }

    setIsSubmitting(true);
    const catPayload: CategoryItem = {
      id: slugId.trim().toLowerCase(),
      nameEn: nameEn.trim(),
      nameUr: nameUr.trim(),
      icon: icon.trim() || '🌿',
      description: description.trim(),
      descriptionUrdu: descriptionUrdu.trim(),
      badgeColor: badgeColor
    };

    let success = false;
    if (editingCatId) {
      success = await updateCategory(catPayload);
    } else {
      success = await addCategory(catPayload);
    }

    setIsSubmitting(false);
    if (success) {
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    if (id === 'all') {
      showToast('Cannot delete the root All Products category.');
      return;
    }
    const count = products.filter(p => p.category === id).length;
    if (count > 0) {
      const confirm = window.confirm(
        `There are ${count} active products under this category. Are you sure you want to delete this category?`
      );
      if (!confirm) return;
    }
    await deleteCategory(id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in duration-150">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0b2317] text-white flex items-center justify-between border-b border-emerald-950 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#00873E] text-white flex items-center justify-center font-bold shadow-md border border-white/20">
              <FolderPlus className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded border border-white/20">
                  Taxonomy & Classification
                </span>
                <span className="text-[11px] text-emerald-200 font-serif">
                  کیٹیگریز مینجمنٹ
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-white">
                Dawakhana E-Commerce Product Categories
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!showAddForm && (
              <button
                onClick={() => {
                  resetForm();
                  setShowAddForm(true);
                }}
                className="py-2 px-3.5 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors border border-white/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Category</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Add / Edit Category Form Panel */}
          {showAddForm && (
            <form onSubmit={handleSaveCategory} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {editingCatId ? `Edit Category: ${nameEn}` : 'New Category Details (نئی کیٹیگری کی تفصیلات)'}
                </h3>
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-[11px] font-bold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* English Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Category Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={nameEn}
                    onChange={(e) => handleNameEnChange(e.target.value)}
                    placeholder="e.g. Khamira & Electuaries"
                    className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#00873E]"
                  />
                </div>

                {/* Urdu Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Category Name (Urdu - اردو نام) *</label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    value={nameUr}
                    onChange={(e) => setNameUr(e.target.value)}
                    placeholder="مثلاً: خمیرہ جات و مروارید"
                    className="w-full text-xs font-serif bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#00873E]"
                  />
                </div>

                {/* Slug ID */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Category ID / Slug *</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingCatId}
                    value={slugId}
                    onChange={(e) => setSlugId(e.target.value)}
                    placeholder="e.g. khamira-jawahar"
                    className="w-full text-xs font-mono bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#00873E] disabled:bg-slate-100"
                  />
                </div>

              </div>

              {/* Emoji Icon & Badge Theme */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Icon / Symbol</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      className="w-14 text-center text-lg bg-white border border-slate-300 rounded-xl py-1 outline-none"
                    />
                    <div className="flex flex-wrap gap-1">
                      {EMOJI_PRESETS.slice(0, 10).map((em, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setIcon(em)}
                          className="w-7 h-7 text-xs bg-white rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center"
                        >
                          {em}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Color Tag Style</label>
                  <select
                    value={badgeColor}
                    onChange={(e) => setBadgeColor(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#00873E]"
                  >
                    {COLOR_PRESETS.map((col, idx) => (
                      <option key={idx} value={col.value}>{col.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Description (English)</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of this category..."
                    className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#00873E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">تفصیل (Urdu)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={descriptionUrdu}
                    onChange={(e) => setDescriptionUrdu(e.target.value)}
                    placeholder="کیٹیگری کا اردو تعارف..."
                    className="w-full text-xs font-serif bg-white border border-slate-300 rounded-xl px-3 py-2 outline-none focus:border-[#00873E]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="py-2 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-5 rounded-xl bg-[#00873E] hover:bg-[#007335] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  {isSubmitting ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                  <span>{editingCatId ? 'Update Category' : 'Save Category'}</span>
                </button>
              </div>

            </form>
          )}

          {/* Existing Categories Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Existing Pharmacopeia Categories ({categories.length})
              </h3>
              <span className="text-[11px] text-slate-500">
                Categories dynamically update filters across shop & storefront
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat) => {
                const count = products.filter(p => p.category === cat.id).length;
                const isAll = cat.id === 'all';

                return (
                  <div
                    key={cat.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#00873E] shadow-2xs flex items-start justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-lg flex items-center justify-center shrink-0 border border-slate-200">
                        {cat.icon || '🌿'}
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{cat.nameEn}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f0faf4] text-[#00873E] border border-[#b0e6c4]">
                            {count} Products
                          </span>
                        </div>
                        <p className="text-xs text-[#00873E] font-serif truncate">{cat.nameUr}</p>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {cat.description || cat.id}
                        </p>
                      </div>
                    </div>

                    {!isAll && (
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleStartEdit(cat)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                          title="Edit Category"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
