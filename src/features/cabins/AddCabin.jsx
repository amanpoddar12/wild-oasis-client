import React from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";

import Modal from "../../ui/Modal";

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens={"cabin-form"}>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name={"cabin-form"}>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// export default function AddCabin() {
//   const [isOpenModel, setIsOpenModel] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModel(!isOpenModel)}>
//         Add new cabin
//       </Button>
//       {isOpenModel && (
//         <Model onCloseModel={() => setIsOpenModel(false)}>
//           <CreateCabinForm onCloseModel={() => setIsOpenModel(false)} />
//         </Model>
//       )}
//     </div>
//   );
// }
