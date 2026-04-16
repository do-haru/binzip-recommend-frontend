import "./DetailPanel.css";

const DetailPanel = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        background: "red",
        padding: "20px",
        zIndex: 999,
      }}
    >
      DetailPanel
    </div>
  );
};

export default DetailPanel;
