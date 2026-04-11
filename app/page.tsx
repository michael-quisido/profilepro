import IDCard from "./components/IDCard";

export default function Home() {
  return (
    <div className="brick-wall">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        padding: '20px'
      }}>
        <IDCard />
      </div>
    </div>
  );
}