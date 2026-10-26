"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Check,
  X,
  ExternalLink,
  Loader2,
  Save,
} from "lucide-react";

export default function BlogCMSPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Loan Settlement",
    excerpt: "",
    content: "",
    readTime: "5 min read",
    author: "Settle Loan Expert Editorial Team",
    published: true,
    metaTitle: "",
    metaDescription: "",
  });

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      if (res.ok) {
        const json = await res.json();
        setPosts(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenCreate = () => {
    setFormData({
      title: "",
      slug: "",
      category: "Loan Settlement",
      excerpt: "",
      content: "",
      readTime: "5 min read",
      author: "Settle Loan Expert Editorial Team",
      published: true,
      metaTitle: "",
      metaDescription: "",
    });
    setEditingPost(null);
    setIsCreating(true);
  };

  const handleOpenEdit = (post: any) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      readTime: post.readTime || "5 min read",
      author: post.author,
      published: post.published,
      metaTitle: post.metaTitle || post.title,
      metaDescription: post.metaDescription || post.excerpt,
    });
    setEditingPost(post);
    setIsCreating(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (val: string) => {
    if (!editingPost) {
      setFormData({
        ...formData,
        title: val,
        slug: generateSlug(val),
      });
    } else {
      setFormData({ ...formData, title: val });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingPost
        ? `/api/admin/blogs/${editingPost.id}`
        : "/api/admin/blogs";
      const method = editingPost ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsCreating(false);
        setEditingPost(null);
        fetchPosts();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save post");
      }
    } catch (err: any) {
      alert(err.message || "Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchPosts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">
            Blog & Content Management
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
            Author and publish educational financial guides for Indian consumers
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-emerald text-white text-xs font-bold hover:bg-brand-emerald-dark transition-colors self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-brand-border">
              <tr>
                <th className="py-3.5 px-4">Article Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-emerald mx-auto"></div>
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    No articles published yet.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-brand-navy line-clamp-1 max-w-md">
                        {post.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        /blog/{post.slug}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-brand-mint text-brand-emerald font-semibold rounded text-[10px]">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                          post.published
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {new Date(post.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="inline-flex p-1.5 text-slate-400 hover:text-brand-navy"
                        title="View post"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(post)}
                        className="p-1.5 text-slate-400 hover:text-brand-emerald"
                        title="Edit post"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600"
                        title="Delete post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-brand-border w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-5 bg-brand-navy text-white flex justify-between items-center">
              <h3 className="font-bold text-base text-white">
                {editingPost ? "Edit Educational Article" : "Create New Article"}
              </h3>
              <button
                onClick={() => setIsCreating(false)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs font-mono border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-brand-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  >
                    <option value="Loan Settlement">Loan Settlement</option>
                    <option value="Credit Card Debt">Credit Card Debt</option>
                    <option value="Credit Score">Credit Score</option>
                    <option value="Banking Regulations">Banking Regulations</option>
                    <option value="Debt Relief">Debt Relief</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) =>
                      setFormData({ ...formData, readTime: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Publish Status
                  </label>
                  <select
                    value={formData.published ? "true" : "false"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        published: e.target.value === "true",
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-brand-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                  >
                    <option value="true">Published</option>
                    <option value="false">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1">
                  Short Excerpt (Summary for search & index) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1">
                  Full Content (Markdown format supported: ## Section, ### Sub, etc.) *
                </label>
                <textarea
                  rows={10}
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs font-mono border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-emerald"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-brand-border">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 border border-brand-border rounded-lg text-xs font-semibold text-brand-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-brand-emerald hover:bg-brand-emerald-dark text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saving ? "Saving..." : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
