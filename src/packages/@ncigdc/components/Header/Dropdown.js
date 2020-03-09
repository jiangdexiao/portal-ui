import React from 'react';
import urlJoin from 'url-join';
import Dropdown from '@ncigdc/uikit/Dropdown';
import DropdownItem from '@ncigdc/uikit/DropdownItem';
import styled from '@ncigdc/theme/styled';
import Link from '@ncigdc/components/Links/Link';

const iconStyle = {
  fontSize: '1.65rem',
  marginRight: '0.5rem',
};

const DropdownItemStyled = styled(DropdownItem, {
  cursor: 'pointer',
});

const HeaderDropdown = ({
  activeStyle = {},
  basePath = '',
  children,
  icon: IconComponent,
  items,
  onClick: baseOnClick,
}) => (
  <Dropdown
    activeStyle={activeStyle}
    basePath={basePath}
    button={children}
    style={{ position: 'initial' }}
    >
    {items.map(({
      description = '',
      onClick,
      pathname = '',
    }) => (
      <DropdownItemStyled
        key={description}
        >
        <Link
          onClick={onClick || baseOnClick}
          pathname={urlJoin(basePath, pathname)}
          >
          {IconComponent && (
            <IconComponent
              style={{
                ...iconStyle,
                fontSize: '1.8rem',
                marginRight: '0.6rem',
              }}
              />
          )}

          <span>{description}</span>
        </Link>
      </DropdownItemStyled>
    ))}
  </Dropdown>
);

export default HeaderDropdown;
