"use client";

import { Menu } from "react-feather";
import { Button, Modal, useToggle } from "reshaped";
import LayoutMenu from "@/components/LayoutMenu";

const LayoutMenuModal = () => {
  const menuToggle = useToggle();

  return (
    <>
      <Button.Aligner>
        <Button icon={Menu} variant="ghost" onClick={menuToggle.activate} />
      </Button.Aligner>
      <Modal
        active={menuToggle.active}
        onClose={menuToggle.deactivate}
        position={{ s: "bottom", m: "start" }}
        size={{ s: "auto", m: "300px" }}
        padding={0}
      >
        <LayoutMenu />
      </Modal>
    </>
  );
};

export default LayoutMenuModal;
