'use client';

import { PropsWithChildren, useState } from 'react';

import { DiscoverAgentCard } from '@/components/Agents/DiscoverAgentCard';
import { Button, Icon, Tabs, Text, Tooltip } from '@/components/Shared';
import { useListAgents } from '@/hooks/agents';
import { cn } from '@/utils';

const tabs = [
  <div className="flex items-center gap-2" key="company">
    <Icon name="users-three" kind="outline" className="text-volcanic-300 dark:text-mushroom-700" />
    <Text>Company</Text>
  </div>,
  <div className="flex items-center gap-2" key="private">
    <Icon name="profile" kind="outline" className="text-volcanic-300 dark:text-mushroom-700" />
    <Text>Private</Text>
  </div>,
];

export const DiscoverAgents = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <div className="flex h-full w-full flex-grow flex-col overflow-y-auto rounded-lg border border-marble-950 bg-marble-1000 md:ml-0 dark:border-volcanic-100 dark:bg-volcanic-100">
      <header
        className={cn(
          'border-b border-marble-950 bg-cover dark:border-volcanic-150',
          'bg-[url(/images/cellBackground.svg)] dark:bg-none',
          'px-4 py-6 md:px-9 md:py-10 lg:px-10',
          'flex items-center justify-between'
        )}
      >
        <div className="flex items-center gap-2">
          <Text styleAs="h4" className="text-volcanic-400 dark:text-mushroom-950">
            All Assistants
          </Text>
          <Tooltip label="tbd" hover size="sm">
            <Icon
              name="information"
              kind="outline"
              className="text-volcanic-300 dark:text-mushroom-700"
            />
          </Tooltip>
        </div>
        <Button
          kind="secondary"
          className="dark:[&_span]:text-evolved-green-700"
          startIcon="add"
          label="Create Assistant"
          href="/new"
        />
      </header>
      <section className="p-8">
        <Tabs
          tabs={tabs}
          selectedIndex={selectedTabIndex}
          onChange={setSelectedTabIndex}
          tabGroupClassName="h-full"
          tabClassName="pt-2.5"
          panelsClassName="pt-7 lg:pt-7 px-0 flex flex-col rounded-b-lg bg-marble-1000 dark:bg-volcanic-100 md:rounded-b-none"
          fitTabsContent
        >
          <CompanyAgents />
          <PrivateAgents />
        </Tabs>
      </section>
    </div>
  );
};

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="max-w-screen-xl flex-grow overflow-y-auto py-10">
    <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-3 xl:grid-cols-4">{children}</div>
  </div>
);

const CompanyAgents = () => (
  <Wrapper>
    <DiscoverAgentCard
      isBaseAgent
      name="Command R+"
      description="Review, understand and ask questions about  internal financial documents."
    />
  </Wrapper>
);

const PrivateAgents = () => {
  const { data: agents = [] } = useListAgents();

  return (
    <Wrapper>
      {agents?.map((agent) => (
        <DiscoverAgentCard
          key={agent.name}
          description={agent.description ?? undefined}
          name={agent.name}
          id={agent.id}
        />
      ))}
    </Wrapper>
  );
};
