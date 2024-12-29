import React from "react";
import "./Styles/Main.css";
function Main() {
  const [data, SetData] = React.useState([]);
  const [draggedItemId, setdraggedItemId] = React.useState(null);
  const [dragging, setDragging] = React.useState(false);
  const [dragOverId, setDragOverId] = React.useState(null);
  const fetchData = () => {
    fetch("./data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(data => {
        if (!data.ok) {
          throw new Error("Something went wrong");
        }
        return data.json();
      })
      .then(data => {
        console.log(data);
        SetData(data);
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => fetchData(), []);
  const DragStart = (event, id) => {
    setdraggedItemId(id);
    setDragging(true);
    event.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (event, element) => {
    event.preventDefault();
    setDragOverId(element.id);
  };

  const handleDrop = (event, targetId) => {
    event.preventDefault();
    const draggedIndex = data.findIndex(item => item.id === draggedItemId);
    const targetIndex = data.findIndex(item => item.id === targetId);

    const newItems = [...data];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);
    SetData(newItems);
    setdraggedItemId(null);
    setDragging(false);
    setDragOverId(null);
  };

  return (
    <div className="Div">
      <div className="MainDiv">
        {data.slice(0, 10).map((obj, index) => (
          <div
            className={`MainDiv2 
    ${dragging && draggedItemId === obj.id ? "dragging" : ""} 
    ${dragOverId === obj.id ? "drag-over" : ""}`}
            onDragStart={event => DragStart(event, obj.id)}
            draggable
            onDragOver={event => handleDragOver(event, obj)}
            onDrop={event => handleDrop(event, obj.id)}
            key={index}
          >
            <p>{obj.id}</p>
            <p>{obj.name}</p>
            <p>{obj.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
