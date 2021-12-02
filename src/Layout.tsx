import React from "react";

export function Layout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full min-h-screen flex flex-col items-center  font-display  font-bold uppercase py-20 max-w-screen-md mx-auto">
      <h1 className="mb-2 text-2xl md:text-8xl">
        The
        <br />
        Drawing App
      </h1>
      <h2 className="text-sm">{title}</h2>

      {children}
    </div>
  );
}
