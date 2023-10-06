export function Edit(props) {
  function EditMode() {
    const elements = document.querySelectorAll(".movie");
    elements.forEach((element) => {
        if (element.classList.contains('hover')){
            element.classList.remove('hover', 'hidden')
          }else{
            element.classList.add("hover", "hidden");
          }
          
        });
      }
  return (
    <>
    <button className="edit" onClick={EditMode}>
      Edit Mode
    </button>
    <button className="edit"
    onClick={() => setIsModalOpen({ state: true, type: "add" })}
    >
    Add Movie
  </button>
    </>
  );
}
