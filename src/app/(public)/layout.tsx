import { getDictionary, getLocale } from "@/lib/i18n";
import { Footer } from "@/components/layout/Footer";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Cursor } from "@/components/public/Cursor";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale();
  const dictionary = getDictionary(locale);

  return (
    <LenisProvider>
      <Cursor />
      <PublicHeader
        locale={locale}
        dictionary={{ ...dictionary.header, language: dictionary.language }}
      />
      <div className="pt-20">{children}</div>
      <Footer
        dictionary={{
          ...dictionary.footer,
          journal: dictionary.header.journal,
          admin: dictionary.header.admin
        }}
      />
    </LenisProvider>
  );
}
