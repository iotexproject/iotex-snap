import { Popover } from "@headlessui/react"
import styled from "styled-components";

const AvatarImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const Avatar = () => {
  return (
    <Popover>
    <Popover.Button as={AvatarImg}>Solutions</Popover.Button>
    <Popover.Panel>
      <Popover.Button  href="/insights">
        Insights
      </Popover.Button>
      {/* ... */}
    </Popover.Panel>
  </Popover>
  )
}
