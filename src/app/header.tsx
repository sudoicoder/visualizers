import {
  getKnownRouteNames,
  useLocation,
  useNavigate,
  type KnownRouteName,
} from "@/routes"
import { Header as BaseHeader, Group, SegmentedControl, Title } from "@/styles"

export const Header: React.FC = () => {
  return (
    <BaseHeader height={60}>
      <Group
        position="apart"
        h="100%"
        px="xs"
      >
        <Group>
          <Title
            color="blue.4"
            size={20}
          >
            VISUALIZERS
          </Title>
        </Group>
        <RoutesSwitcher />
      </Group>
    </BaseHeader>
  )
}

const RoutesSwitcher: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <SegmentedControl
      color="blue"
      tt="capitalize"
      data={getKnownRouteNames()}
      value={location.pathname.slice(1)}
      onChange={route => navigate(route as KnownRouteName)}
    />
  )
}
