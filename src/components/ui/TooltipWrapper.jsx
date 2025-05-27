import * as Tooltip from "@radix-ui/react-tooltip";

const TooltipWrapper = ({ content, children }) => (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="bg-gray-800 text-white mt-1 px-3 py-1 rounded text-sm shadow-lg"
          side="bottom"
          sideOffset={5}
        >
          {content}
          <Tooltip.Arrow className="fill-gray-800" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
);

export default TooltipWrapper;
