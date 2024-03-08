import { CopyIcon } from '@chakra-ui/icons';
import { Popover } from '@headlessui/react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';

interface CopyProps {
  value?: string;
  isConvert?: boolean;
  copyTip?: string;
}

const PopoverWrap = styled(Popover)`
  position: relative;
  margin-left: 4px;
`;

const PopoverPanel = styled(Popover.Panel)`
  position: absolute;
  z-index: 10;
  padding: 4px 8px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #e2e8f0;
`;

const PopoverButton = styled(Popover.Button)`
  border: none;
  background-color: #fff;
  min-height: auto;
  color: #4b5563;
  padding: 4px;
  :hover {
    border: none;
  }
  :focus {
    border: none;
  }
  :focus-visible {
    border: none;
  }
`;

export const Copy = observer(
  ({
    value = '',
    isConvert = true,
    copyTip = 'Copy address to clipboard',
    ...restProps
  }: CopyProps) => {
    const store = useLocalObservable(() => ({
      copied: false,
      isTooltipOpen: false,
      setCopied(copied: boolean) {
        this.copied = copied;
      },
      setIsTooltipOpen(isTooltipOpen: boolean) {
        this.isTooltipOpen = isTooltipOpen;
      },
    }));

    const CopyTrigger = observer(({ onClick }: { onClick?: any }) => {
      return (
        <PopoverWrap className="relative">
          <PopoverButton>
            <CopyIcon
              onClick={() => {
                onClick?.();
              }}
              onMouseEnter={() => {
                store.setIsTooltipOpen(true);
              }}
              onMouseLeave={() => {
                store.setIsTooltipOpen(false);
                store.setCopied(false);
              }}
              cursor="pointer"
              {...restProps}
            />
          </PopoverButton>

          <PopoverPanel className="absolute z-10">Copied</PopoverPanel>
        </PopoverWrap>
      );
    });
    return (
      <span>
        <CopyToClipboard
          text={value}
          onCopy={() => {
            store.setCopied(true);
          }}
        >
          <CopyTrigger />
        </CopyToClipboard>
      </span>
    );
  },
);

Copy.displayName = 'Copy';
