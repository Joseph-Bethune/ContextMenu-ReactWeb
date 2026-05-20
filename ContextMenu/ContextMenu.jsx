import React from 'react';
import './ContextMenu.css';

export const MenuItemTypes = {
    spacer: 0,
    label: 1,
    button: 2,
}

const ContextMenu = ({
    rightClickItem,
    positionX,
    positionY,
    isToggled,
    menuItems,
    contextMenuRef
}) => {
    return (
        <menu
            className={`contextMenu${isToggled ? ' active' : ' inactive'}`}
            ref={contextMenuRef}
            style={{
                top: positionY + 1 + 'px',
                left: positionX + 1 + 'px',
            }}
        >
            {menuItems.map((menuItem, index) => {
                if (menuItem.itemType == MenuItemTypes.spacer) return <hr key={index} />

                if (menuItem.itemType == MenuItemTypes.label) return <span key={index} className="contextMenuLabel">{menuItem.text}</span>

                function handleClick(e) {
                    e.stopPropagation();
                    menuItem.onClick(e, rightClickItem);
                }

                return (
                    <button
                        onClick={handleClick}
                        key={index}
                        className="contextMenuButton"
                    >
                        <span>{menuItem.text}</span>
                    </button>
                );
            })}
        </menu>
    )
}

export default ContextMenu