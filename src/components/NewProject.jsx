import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({ onAdd, onCancel }) {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  /* 
    refs in custom components doesnt work since it doesnt pass the ref into inner elements
    we need to forward incoming refs to establish cross component ref connection

    in child components import forwardRef and wrap the component with it then export
    (check input.jsx)

    when that is done we can use ref on inputs on this page

    refs when referenced, they need to be refName.current.(insert anything that the element has in js normally, like .value for example)
  */

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    /* validation */
    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate === ""
    ) {
      /* show error modal */
      modal.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal
        ref={modal}
        buttonCaption="Okay"
      >
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid input</h2>
        <p className="text-stone-600 mb-4">
          Ooops, ... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every input field.
        </p>
      </Modal>

      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>

        <div>
          <Input
            ref={title}
            label="Title"
            type="text"
          ></Input>
          <Input
            ref={description}
            label="Description"
            textarea
          ></Input>
          <Input
            ref={dueDate}
            label="Due Date"
            type="date"
          ></Input>
        </div>
      </div>
    </>
  );
}
