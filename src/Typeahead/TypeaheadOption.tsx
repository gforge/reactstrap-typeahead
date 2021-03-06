import * as React from 'react';
import classNames from 'classnames';
import { SelectorOptionSelector, Option } from '../types';
import ButtonHref from '../Components/ButtonHref';

export interface CustomClasses {
  listItem?: string;
  hover?: string;
  customAdd?: string;
  listAnchor?: string;
}

export interface Props<Opt extends Option> {
  customClasses?: CustomClasses;
  customValue?: string;
  children: React.ReactNode;
  hover?: boolean;
  result?: Opt;
  handleOptionSelected: SelectorOptionSelector<Opt | string>;
}

const getClasses = ({
  customClasses,
}: {
  customClasses: { listAnchor?: string };
}) => {
  const classes: { [key: string]: boolean } = {
    'typeahead-option': true,
  };
  const { listAnchor } = customClasses;
  if (listAnchor) {
    classes[listAnchor] = true;
  }

  return classNames(classes);
};

/**
 * A single option within the TypeaheadSelector
 */
const TypeaheadOption = <T extends Option>(props: Props<T>) => {
  const {
    customClasses = {},
    hover,
    children,
    customValue,
    result,
    handleOptionSelected,
  } = props;

  const onClick = React.useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      event.preventDefault();
      if (customValue) {
        handleOptionSelected(customValue, event);
      } else if (result) {
        handleOptionSelected(result, event);
      }
    },
    [handleOptionSelected, result, customValue]
  );

  const onSpace = React.useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>) => {
      if (event.key !== 'Space') {
        return;
      }

      if (customValue) {
        handleOptionSelected(customValue, event);
      } else if (result) {
        handleOptionSelected(result, event);
      }
    },
    [handleOptionSelected, customValue, result]
  );

  const classes: { [key: string]: boolean } = {};
  const { listItem, hover: hoverClass = 'hover', customAdd } = customClasses;
  classes[hoverClass] = !!hover;
  if (listItem) {
    classes[listItem] = Boolean(listItem);
  }

  if (customValue && customAdd) {
    classes[customAdd] = Boolean(customAdd);
  }

  const classList = classNames(classes);

  // For some reason onClick is not fired when clicked on an option
  // onMouseDown is used here as a workaround of #205 and other
  // related tickets
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className={classList}
      onClick={onClick}
      onMouseDown={onClick}
      onKeyDown={onSpace}
    >
      <ButtonHref className={getClasses({ customClasses })}>
        {children}
      </ButtonHref>
    </li>
  );
};

export default TypeaheadOption;
