import IDCard from "./components/IDCard";

export default function Home() {
  return (
    <div className="brick-wall" style={{ minHeight: '100vh', padding: '200px 20px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IDCard />
      </div>
    </div>
  );
}