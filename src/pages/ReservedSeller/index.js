import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReservedListSeller from "../../components/ReservedListSeller";

function ReservedSeller() {
  return (
    <>
      <Header />
      <ReservedListSeller type="reservedSeller" />
      <Footer />
    </>
  );
}

export default ReservedSeller;
