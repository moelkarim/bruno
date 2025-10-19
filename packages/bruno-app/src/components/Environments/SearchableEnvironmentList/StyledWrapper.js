import styled from 'styled-components';

const StyledWrapper = styled.div`
  .dropdown-item.disabled {
    cursor: not-allowed;
    color: ${(props) => props.theme.colors.text.muted};
  }

  /* Search input styling */
  .search-input-container input[type="text"] {
    background-color: ${(props) => props.theme.dropdown.bg};
    color: ${(props) => props.theme.dropdown.color};
    border: 1px solid ${(props) => props.theme.dropdown.separator};

    &:focus {
      outline: none;
    }
  }
`;

export default StyledWrapper;
