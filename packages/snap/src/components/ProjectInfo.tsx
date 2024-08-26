import {
  Box,
  Text,
  Heading,
  Row,
  Link,
  Button,
  Option,
} from '@metamask/snaps-sdk/jsx';

import { DSProject } from './HomePanel';
import { DEPINSCAN_PROJECT } from '../config/links';

export function ProjectInfo({ project }: { project: DSProject }) {
  return (
    <Box>
      <Heading>{project.project_name}</Heading>
      <Text>
        Link to project:{' '}
        <Link href={DEPINSCAN_PROJECT + project.slug}>
          {project.project_name}
        </Link>
      </Text>
      <Row label="Description">
        <Text>{project.description}</Text>
      </Row>
      <Row label="Token">
        <Text>{project.token}</Text>
      </Row>
      <Row label="Total Devices">
        <Text>{project.total_devices?.toString() || ""}</Text>
      </Row>
      <Row label="Days to Breakeven">
        <Text>{project.days_to_breakeven?.toString() || ""}</Text>
      </Row>
      <Row label="Market Cap">
        <Text>$ {project.market_cap?.toString() || ""}</Text>
      </Row>
      <Row label="Token Price">
        <Text>$ {project.token_price?.toString() || ""}</Text>
      </Row>
      <Row label="Avg Device Cost">
        <Text>$ {project.avg_device_cost?.toString() || ""}</Text>
      </Row>
      <Row label="Estimated Daily Earnings">
        <Text>$ {project.estimated_daily_earnings?.toString() || ""}</Text>
      </Row>



      <Button type="button" name="go-back">
        Go Back
      </Button>
    </Box>
  );
}

export function DSProjectRow({ project }: { project: DSProject }) {
  return <Option value={project.project_name}>{project.project_name}</Option>;
}
