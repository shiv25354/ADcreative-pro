
import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const AdStrategyDisplay: React.FC = () => {
  const { strategy, imageUrl: generatedImageUrl } = useCampaign();
  
  if (!strategy) return null;

  const handleDownloadPDF = () => {
    const doc = new jsPDF() as any;
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(26, 115, 232); // Google Blue
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('AdCreative Pro Production Deck', 15, 25);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Campaign: ${strategy.purpose.core.substring(0, 40)}...`, 15, 33);

    // Section 1
    doc.setTextColor(32, 33, 36);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('1. Strategic Context', 15, 55);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Persona: ${strategy.purpose.creatorPersona || 'Expert Creator'}`, 15, 62);
    doc.text(`Tone: ${strategy.purpose.tone}`, 15, 67);

    // Table
    const tableRows = strategy.storyboard.map(s => [
      s.timing,
      s.audio,
      `Visual: ${s.visual}\nAngle: ${s.cameraAngle}\nText: "${s.text}"`,
      s.creatorInstruction
    ]);

    doc.autoTable({
      startY: 75,
      head: [['Time', 'Script (Audio)', 'Visual Directives', 'Notes']],
      body: tableRows,
      headStyles: { fillColor: [26, 115, 232], textColor: [255, 255, 255] },
      styles: { fontSize: 8 },
      margin: { left: 15, right: 15 }
    });

    doc.save('adcreative-campaign.pdf');
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Action Header */}
      <div className="material-card p-6 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 border border-blue-100">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Finalized Strategy</h3>
            <p className="text-sm text-gray-500">Ready for production & creator briefing</p>
          </div>
        </div>
        <button onClick={handleDownloadPDF} className="btn-primary px-8 py-3 flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Export Production PDF
        </button>
      </div>

      {/* Strategic Foundation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 material-card p-8 border-t-4 border-t-blue-600">
          <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Creator Identity</h4>
          <p className="text-2xl font-bold text-gray-900 leading-tight mb-4">
            {strategy.purpose.creatorPersona}
          </p>
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target Tone</p>
              <p className="text-sm font-medium text-gray-700">{strategy.purpose.tone}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Primary Objective</p>
              <p className="text-sm font-medium text-gray-700">{strategy.purpose.goal}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 material-card p-8 bg-gray-50/50 border border-gray-100">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Authenticity Checklist</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategy.authenticityChecklist.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Production Storyboard */}
      <section className="material-card overflow-hidden">
        <div className="bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">Campaign Storyboard</h3>
          <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-500 rounded">15s Duration</span>
        </div>
        
        <div className="divide-y divide-gray-100">
          {strategy.storyboard.map((scene, i) => (
            <div key={i} className="p-8 hover:bg-gray-50/30 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-2">
                  <span className="text-blue-600 font-bold font-mono text-xl">{scene.timing}</span>
                  <p className="text-[10px] font-black text-gray-300 uppercase mt-1">Scene {i + 1}</p>
                </div>
                
                <div className="lg:col-span-10 space-y-6">
                  <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 relative">
                    <label className="absolute -top-3 left-4 bg-blue-600 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded">Spoken Script</label>
                    <p className="text-lg text-gray-800 font-medium leading-relaxed italic">
                      "{scene.audio}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Visual Directive</label>
                        <p className="text-sm text-gray-800 font-semibold">{scene.visual}</p>
                        <div className="mt-3 flex gap-4">
                          <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold">{scene.cameraAngle}</span>
                          <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold">{scene.moodLighting}</span>
                        </div>
                      </div>
                      <div className="bg-green-50/30 p-4 rounded-lg border border-green-100">
                        <label className="text-[9px] font-bold text-green-600 uppercase tracking-widest block mb-2">Overlay Text</label>
                        <p className="text-sm text-gray-800 font-bold italic">"{scene.text}"</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Creator Guidance</label>
                      <p className="text-xs text-gray-600 leading-relaxed italic">{scene.creatorInstruction}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Reference & CTA */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-2 relative group">
          {generatedImageUrl ? (
            <div className="material-card overflow-hidden ring-4 ring-white shadow-2xl">
              <img src={generatedImageUrl} alt="Visual Ref" className="w-full h-auto object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm p-4 text-center border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">AI Generated Visual Reference</p>
              </div>
            </div>
          ) : (
            <div className="w-full aspect-[9/16] bg-gray-50 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4" />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rendering Reference...</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-3 space-y-8">
          <div className="material-card p-8 bg-blue-600 text-white">
            <h3 className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-6">Final Conversion Call</h3>
            <div className="space-y-8">
              <div>
                <label className="text-[9px] font-bold text-blue-200 uppercase tracking-widest block mb-2">Call To Action Copy</label>
                <p className="text-4xl font-bold italic leading-tight">"{strategy.cta.copy}"</p>
              </div>
              <div className="pt-6 border-t border-blue-500/50">
                <label className="text-[9px] font-bold text-blue-200 uppercase tracking-widest block mb-2">Native Placement Instructions</label>
                <p className="text-sm text-blue-50 mb-4">{strategy.cta.linkPlacement}</p>
                <div className="bg-white/10 p-4 rounded border border-white/20 font-mono text-xs break-all">
                  {strategy.cta.exampleLink}
                </div>
              </div>
            </div>
          </div>

          <div className="material-card p-8">
            <h3 className="text-sm font-bold text-gray-900 mb-6">Strategic Performance Tips</h3>
            <div className="space-y-6">
              {strategy.tips.map((tip, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <span className="text-3xl font-black text-gray-100 group-hover:text-blue-100 transition-colors">0{i+1}</span>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed pt-2">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdStrategyDisplay;
