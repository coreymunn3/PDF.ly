"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        !open ? setIsOpen(open) : null;
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button color="primary">Open</Button>
      </DialogTrigger>
      <DialogContent>Example</DialogContent>
    </Dialog>
  );
};

export default UploadButton;
