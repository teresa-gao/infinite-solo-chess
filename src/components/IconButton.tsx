import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IconDefinition } from "@fortawesome/fontawesome-svg-core";

export default function IconButton({
  onClick,
  disabled,
  icon,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: IconDefinition;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="cursor-pointer enabled:hover:opacity-30 enabled:dark:hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-100"
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
