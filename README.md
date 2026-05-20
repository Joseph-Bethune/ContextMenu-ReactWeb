# Setup
In order to use the context menu in a project, follow the instructions below.

1. Place the context menu files inside of a directory within your project. (ContextMenu.css, ContextMenu.jsx, ContextMenuParent.jsx)

2. Import the ContextMenuParent.jsx's default export into the desired react component file. 
    - Try to place this as high in the component hiearchy as possible to ensure that any subcomponents have access to the reference.

3. Create a reference hook and give it to the context menu parent component.
4. Render the component.

After this initial setup, the user needs only call the openContextMenuDelegate() method on an instance of the contextMenuParent reference in order to open the context menu.
- You will need to to give this method information on what to put inside of the context menu.

## Setup the context menu in the parent component
### Import statement
Choose a react compnent to render the context menu. This compnent doesn't need to be at the top of the component hierarchy, but it will need to be above any components that will wish to use the context menu.

The following code will need to be modified to point to where-ever you saved the ContextMenuParent.jsx file. Notice that this uses the ContextMenuParent and not the ContextMenu: this is important. 
```
import ContextMenuParent from '{Context menu directory}';
```

### Create reference hook and apply it to the context menu parent component
```
//#region context menu

const contextMenuParentRef = useRef(null);

const renderContextMenu = () => {
    return (<ContextMenuParent
        ref={contextMenuParentRef}
    />)
}

//#endregion
```
### Call rendering method
```
return (
    <div>
    {renderContextMenu()}
    ...
    </div>
)

```
## Opening the context Menu
Once the context menu is setup in the parent component, the parent component and any of its children can open the context menu using the reference hook. 

- In order to get access to the context menu parent reference in a child component, use prop drilling to pass the reference.

In order to function, the openContextMenuDelagate() function will need to be passed a valid menuData json object.
```
contextMenuParentRef.current.openContextMenuDelegate(menuData);
```
# Context Menu Data
The context menu can be customized, but it will need to receive data about what to display (and where) in a specific format.
## Context Menu Item Types
All context menu items must have a type value and for it to be set to one of the values below.

The constant below is exported from the ContextMenu.jsx file. Import it into any component that needs to define a ContextMenuData object.
```
export const MenuItemTypes = {
    spacer: 0,
    label: 1,
    button: 2,
}
```
## Context Menu Item Blueprint
Below is example of a single context menu item.
```
{
    text: ``,
    onClick: () => null,
    itemType: MenuItemTypes.button
}
```
# Menu Data
Below is an array of context menu items.

They are wrapped inside of the context menu data object that is then given to the openContextMenuDelegate() functin call.

Notice that, in addition to the context menu items, the context menu data object also includes click position information. This inclusion needed to determine where the menu will be drawn.
```
const menuItems = [
    {
        text: `${targetData.displayName}`,
        onClick: () => null,
        itemType: MenuItemTypes.label,
    },
    {
        text: "",
        onClick: () => null,
        itemType: MenuItemTypes.spacer,
    },
    {
        text: `Go to profile page`,
        onClick: () => { navigate(`/user/?name=${targetData.displayName}`); },
        itemType: MenuItemTypes.button,
    },
];

const menuData = {
    clickPosition: { x: e.clientX, y: e.clientY },
    menuItems,
};

contextMenuParentRef.current.openContextMenuDelegate(menuData);
```

# Closing the Menu
The menu is programmed to close automatically when the user performs a normal click on any location on the window that is not inside the context menu, or if they open another context menu.

The code controlling this behaviour is stored inside the ContextMenuParent.jsx file.
