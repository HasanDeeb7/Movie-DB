export function Edit() {
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
    <button className="edit" onClick={EditMode}>
      Edit Mode
    </button>
  );
}
