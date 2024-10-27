// import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
// import { getCabins } from "../services/apiCabins";
// import { useEffect } from "react";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useState } from "react";

function Cabins() {
  // useEffect(() => {
  //   getCabins().then((data) => console.log(data));
  // }, []);
  const [showFrom, setShowFrom] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowFrom(!showFrom)}>Add new cabin</Button>
        {showFrom && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
