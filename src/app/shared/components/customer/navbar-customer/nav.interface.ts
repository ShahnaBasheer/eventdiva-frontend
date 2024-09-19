interface SubMenuItem {
  name: string;
  route: string;
}

interface NestedSubMenuItem {
  type: string;
  list: SubMenuItem[];
}

interface MenuItem {
  name: string;
  route: string;
  subItems?: SubMenuItem[];
  subMenu?: NestedSubMenuItem[];
}


export default MenuItem;
