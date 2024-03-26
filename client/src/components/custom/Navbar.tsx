import {
  DarkModeButton,
  DropdownUser,
  Logo,
  HoverCart,
  HoverNotification,
} from "@/components";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const onSubmit = (formData: FormData) => {
    const searchValue = formData.get("searchValue") as string;

    console.log(searchValue);
  };

  return (
    <div className="sticky top-0 w-full max-w-[1920px] z-99 shadow-sm mx-auto xl:px-20 md:px-10 px-4 py-2 border-b bg-slate-100">
      <div className="flex items-center justify-between gap-x-8">
        <Logo />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            formData.append("searchValue", searchValue);

            onSubmit(formData);
          }}
          className="relative hidden w-full xl:w-[700px] md:w-[400px] md:flex items-center"
        >
          <Input
            id="searchValue"
            defaultValue={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          />
          <Button type="submit" variant="secondary" className="rounded-l-none">
            <SearchIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
        </form>
        <div className="flex items-center gap-x-3">
          <DarkModeButton />

          <HoverNotification />

          <HoverCart />

          <DropdownUser />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
