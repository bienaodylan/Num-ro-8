import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Check, Mail, MapPin, Phone } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { settings, navigateTo } = useStore();
  const [appointmentSent, setAppointmentSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    interest: 'toiles',
    notes: ''
  });

  const handleAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentSent(true);
    setTimeout(() => {
      setAppointmentSent(false);
      setForm({ name: '', email: '', phone: '', date: '', interest: 'toiles', notes: '' });
    }, 3500);
  };

  return (
    <div className="w-full bg-[#080808] text-[#E8E5E0] pb-24">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 border-b border-[#1A1A1A]">
        <div className="max-w-3xl space-y-4">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#777]">
            LA DÉMARCHE ARTISTIQUE
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-editorial text-[#E8E5E0] font-normal leading-tight">
            À propos de N°8
          </h1>
          <p className="text-sm text-[#85817D] font-sans leading-relaxed">
            {settings.tagline}
          </p>
        </div>
      </section>

      {/* Narrative Section 1: The vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-sm text-[#A0A0A0] leading-relaxed font-sans">
            <h2 className="text-2xl sm:text-3xl font-serif-editorial text-[#E8E5E0] leading-snug">
              Une maison indépendante à la croisée de l'art brut et de l'avant-garde.
            </h2>
            <p>
              Fondée à Abidjan avec une vocation internationale, la maison <strong>N°8</strong> est née d'une volonté simple : abolir la frontière artificielle entre l'œuvre suspendue à la cimaise d'une galerie et l'objet que l'on porte sur soi.
            </p>
            <p>
              {settings.artistStatement}
            </p>
            <p>
              Dans notre atelier, la toile de lin brut accueille l'huile, le fusain et la cendre, tandis que les sacs en coton lourd sont peints à main levée, faisant de chaque cabas un fragment d'atelier nomade.
            </p>
          </div>

          <div className="lg:col-span-6 aspect-[4/5] bg-[#121212] border border-[#202020] overflow-hidden">
            <img
              src="/assets/n8/art_hero_studio.png"
              alt="Atelier N°8"
              className="w-full h-full object-cover filter contrast-105"
            />
          </div>
        </div>
      </section>

      {/* The 3 Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0C0C0C] border border-[#1A1A1A] p-8 space-y-4">
            <span className="text-xs font-mono text-[#555]">01 / RECHERCHE</span>
            <h3 className="text-lg font-serif-editorial text-[#E8E5E0]">
              Les Toiles Monumentales
            </h3>
            <p className="text-xs text-[#85817D] leading-relaxed">
              Des pièces uniques travaillées pendant plusieurs semaines ou mois. Des couches de pigments purs, des textures sculptées à la spatule et un silence minéral.
            </p>
          </div>

          <div className="bg-[#0C0C0C] border border-[#1A1A1A] p-8 space-y-4">
            <span className="text-xs font-mono text-[#555]">02 / MATIÈRE</span>
            <h3 className="text-lg font-serif-editorial text-[#E8E5E0]">
              Les Objets & Sacs Peints
            </h3>
            <p className="text-xs text-[#85817D] leading-relaxed">
              Chaque sac est peint un à un par la main de l'artiste. Pas de transfert numérique rapide, mais une véritable application picturale fixée au cœur de la fibre.
            </p>
          </div>

          <div className="bg-[#0C0C0C] border border-[#1A1A1A] p-8 space-y-4">
            <span className="text-xs font-mono text-[#555]">03 / CORPS</span>
            <h3 className="text-lg font-serif-editorial text-[#E8E5E0]">
              Les Vêtements Portables
            </h3>
            <p className="text-xs text-[#85817D] leading-relaxed">
              Des coupes boxy franches, du coton biologique dense (280g) et une sérigraphie minérale artisanale pour transformer le vêtement en toile vivante.
            </p>
          </div>
        </div>
      </section>

      {/* Studio Visit & Appointment booking */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-[#0D0D0D] border border-[#1F1F1F] p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#777]">
              VISITE PRIVÉE D'ATELIER
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-editorial text-[#E8E5E0]">
              Rencontrer l'équipe et découvrir les toiles
            </h3>
            <p className="text-xs text-[#85817D] leading-relaxed">
              Nous recevons les collectionneurs, conservateurs et passionnés d'art sur rendez-vous individuel à notre atelier d'Abidjan.
            </p>

            <div className="space-y-3 pt-4 text-xs font-mono text-[#999]">
              <div className="flex items-center gap-3">
                <MapPin size={15} className="text-[#CCC] shrink-0" />
                <span>{settings.atelierAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-[#CCC] shrink-0" />
                <span>{settings.contactEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-[#CCC] shrink-0" />
                <span>{settings.contactPhone}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {appointmentSent ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4 bg-[#141414] border border-[#222]">
                <div className="w-12 h-12 rounded-full border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Check size={24} />
                </div>
                <h4 className="text-sm font-medium uppercase tracking-widest text-[#E8E5E0]">
                  Demande de rendez-vous enregistrée
                </h4>
                <p className="text-xs text-[#85817D] max-w-sm">
                  L'équipe de l'Atelier N°8 vous confirmera le créneau par e-mail ou téléphone sous 24h.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAppointment} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-[#888]">Votre Nom *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Nom et prénom"
                      className="w-full bg-[#161616] border border-[#2A2A2A] px-3 py-2 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-[#888]">E-mail *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="votre@email.com"
                      className="w-full bg-[#161616] border border-[#2A2A2A] px-3 py-2 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-[#888]">Téléphone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+225..."
                      className="w-full bg-[#161616] border border-[#2A2A2A] px-3 py-2 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-[#888]">Date envisagée</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={e => setForm({ ...form, date: e.target.value })}
                      className="w-full bg-[#161616] border border-[#2A2A2A] px-3 py-2 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-[#888]">Domaine d'intérêt principal</label>
                  <select
                    value={form.interest}
                    onChange={e => setForm({ ...form, interest: e.target.value })}
                    className="w-full bg-[#161616] border border-[#2A2A2A] px-3 py-2 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none"
                  >
                    <option value="toiles">Acquisition de toiles / Galerie</option>
                    <option value="sacs">Sacs peints & Objets uniques</option>
                    <option value="collections">Vêtements & Collections futures</option>
                    <option value="presse">Presse & Partenariats institutionnels</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-[#888]">Précisions complémentaires</label>
                  <textarea
                    rows={2}
                    value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    placeholder="Disponibilités horaires, œuvres particulières..."
                    className="w-full bg-[#161616] border border-[#2A2A2A] p-3 text-[#E8E5E0] focus:border-[#E8E5E0] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#E8E5E0] text-[#080808] font-sans text-xs uppercase tracking-[0.2em] font-medium hover:bg-white transition-colors cursor-pointer"
                >
                  Confirmer la demande de visite
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
