import { ResponseData } from '@/api/models/misc.types';
import spacetradersApi from '@/api/api/spacetraders.api';
import { Agent } from '@/api/models/agent.model';

const agentApi = {
  getMyAgent: () => 'my/agent',
};

export default {
  getMyAgent(): Promise<ResponseData<Agent>> {
    return spacetradersApi.get(agentApi.getMyAgent()).then((res) => res.data);
  },
};
