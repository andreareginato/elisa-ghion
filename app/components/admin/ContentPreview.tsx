interface WorkshopPreviewData {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  highlights?: string[];
  testimonials?: Array<{ quote: string; name: string; year: string }>;
}

interface ResearchPreviewData {
  title?: string;
  question?: string;
  description?: string;
  quote?: string;
  influences?: string[];
  image?: string;
}

type ContentPreviewProps =
  | { type: "workshop"; data: WorkshopPreviewData }
  | { type: "research"; data: ResearchPreviewData };

export function ContentPreview(props: ContentPreviewProps) {
  if (props.type === "workshop") return <WorkshopPreview data={props.data} />;
  return <ResearchPreview data={props.data} />;
}

function WorkshopPreview({ data }: { data: WorkshopPreviewData }) {
  return (
    <div className="bg-brand-cream rounded-xl p-6 space-y-4 text-brand-charcoal">
      <p className="text-xs uppercase tracking-wider text-brand-warmGray font-medium">Live Preview</p>
      {data.image && (
        <img src={data.image} alt="" className="w-full h-40 object-cover rounded-lg" />
      )}
      <h2 className="font-heading text-2xl font-bold text-brand-charcoal">
        {data.title || "Workshop Title"}
      </h2>
      {data.subtitle && (
        <p className="text-brand-warmGray italic">{data.subtitle}</p>
      )}
      {data.description && (
        <p className="text-sm leading-relaxed">{data.description}</p>
      )}
      {data.highlights && data.highlights.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-brand-warmGray font-medium">Highlights</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            {data.highlights.map((h, i) => h && <li key={i}>{h}</li>)}
          </ul>
        </div>
      )}
      {data.testimonials && data.testimonials.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-brand-warmGray font-medium">Testimonials</p>
          {data.testimonials.map((t, i) => (
            <blockquote key={i} className="border-l-2 border-brand-terracotta pl-3 text-sm italic">
              "{t.quote}" — <span className="font-medium">{t.name}</span>
              {t.year && <span className="text-brand-warmGray"> ({t.year})</span>}
            </blockquote>
          ))}
        </div>
      )}
    </div>
  );
}

function ResearchPreview({ data }: { data: ResearchPreviewData }) {
  return (
    <div className="bg-brand-cream rounded-xl p-6 space-y-4 text-brand-charcoal">
      <p className="text-xs uppercase tracking-wider text-brand-warmGray font-medium">Live Preview</p>
      {data.image && (
        <img src={data.image} alt="" className="w-full h-40 object-cover rounded-lg" />
      )}
      <h2 className="font-heading text-2xl font-bold text-brand-charcoal">
        {data.title || "Research Area"}
      </h2>
      {data.question && (
        <p className="text-lg italic text-brand-terracotta">"{data.question}"</p>
      )}
      {data.description && (
        <p className="text-sm leading-relaxed">{data.description}</p>
      )}
      {data.quote && (
        <blockquote className="border-l-2 border-brand-gold pl-3 text-sm italic text-brand-warmGray">
          "{data.quote}"
        </blockquote>
      )}
      {data.influences && data.influences.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-brand-warmGray font-medium">Influences</p>
          <div className="flex flex-wrap gap-2">
            {data.influences.map((inf, i) => inf && (
              <span key={i} className="text-xs bg-brand-sand px-2 py-1 rounded-full">{inf}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
