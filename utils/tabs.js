import {
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  MapIcon,
  TruckIcon,
  CreditCardIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export const options = [
  "Personal Information",
  "Account",
  "Password",
  "Directions",
  "Delivery",
];

export const tabs = [
  {
    name: "Personal",
    icon: <UserCircleIcon className="h-5 w-5" />,
  },
  {
    name: "Address",
    icon: <EnvelopeIcon className="h-5 w-5" />,
  },
  {
    name: "Password",
    icon: <KeyIcon className="h-5 w-5" />,
  },
  {
    name: "Direction",
    icon: <MapIcon className="h-5 w-5" />,
  },
  {
    name: "Coming soon",
    icon: <SparklesIcon className="h-5 w-5" />,
  },
];
