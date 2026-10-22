import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KnowledgeLibrary from "@/components/KnowledgeLibrary";
export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-20">
        <KnowledgeLibrary />
      </main>
      <Footer />
    </div>
  );
}
