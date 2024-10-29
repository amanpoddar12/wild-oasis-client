import React, { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";

import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens={"cabin-form"}>
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name={"cabin-form"}>
        <CreateCabinForm />
      </Modal.Window>
      <Modal.Open opens={"table"}>
        <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window name={"table"}>
        <CabinTable />
      </Modal.Window>
    </Modal>
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
