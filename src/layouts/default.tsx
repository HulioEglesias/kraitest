import Header from "@/components/header";
import Footer from "@/components/footer";
import "@/styles/globals.scss";
import "./default.scss";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
