import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import ContextMenu from './ContextMenu'

const contextMenuDefault = {
    position: {
        x: 0,
        y: 0,
    },
    toggled: false,
    menuItems: [],
}

const ContextMenuParent = forwardRef((props, ref) => {

    const { } = props;
    const [contextMenuData, setContextMenuData] = useState(contextMenuDefault);
    const contextMenuRef = useRef(null);

    useImperativeHandle(ref, () => ({
        openContextMenuDelegate(menuData) {
            // position data
            // offsets the context menu to the left or right by its width if the click position is on the right half of the screen
            const contextMenuAttr = contextMenuRef.current.getBoundingClientRect();
            const triggerOffsetX = menuData.clickPosition.x >= window?.innerWidth / 2;

            const position = {
                x: triggerOffsetX ? menuData.clickPosition.x - contextMenuAttr.width : menuData.clickPosition.x,
                y: menuData.clickPosition.y,
            };

            setContextMenuData({
                position: position,
                toggled: true,
                menuItems: menuData.menuItems,
            });
            addContextMenuEventListeners();
        },
        closeContextMenuDelegate() {
            closeContextMenu();
        }
    }));

    const closeContextMenu = () => {
        setContextMenuData(contextMenuDefault);
        removeContextMenuEventListeners();
    }

    //#region event handlers and listeners

    const closeContextMenuNormalClickEventHandler = (e) => {
        const isMatch = contextMenuRef.current != null && contextMenuRef.current.contains(e.target);
        if (!isMatch) {
            closeContextMenu();
        }
        e.stopPropagation();
    }

    const closeContextMenuContextClickEventHandler = (e) => {
        const isMatch = contextMenuRef.current != null && contextMenuRef.current.contains(e.target);
        if (!isMatch) {
            closeContextMenu();
        }
        e.stopPropagation();
    }

    const addContextMenuEventListeners = () => {
        window.addEventListener('click', closeContextMenuNormalClickEventHandler);
        window.addEventListener('contextmenu', closeContextMenuContextClickEventHandler);
    }

    const removeContextMenuEventListeners = () => {
        document.removeEventListener("click", closeContextMenuNormalClickEventHandler);
        document.removeEventListener("contextmenu", closeContextMenuContextClickEventHandler);
    }

    //#endregion  

    useEffect(() => {
        return () => {
            closeContextMenu();
        }
    });

    return (
        <ContextMenu
            contextMenuRef={contextMenuRef}
            isToggled={contextMenuData.toggled}
            positionX={contextMenuData.position.x}
            positionY={contextMenuData.position.y}
            menuItems={contextMenuData.menuItems}
        />
    )
});

export default ContextMenuParent;