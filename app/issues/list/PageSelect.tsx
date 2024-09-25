import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const PageSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handlePageSelect = (pageSize: string) => {
    const params = new URLSearchParams();

    if (searchParams.get('status')) {
      params.append('status', searchParams.get('status')!);
    }
    if (searchParams.get('orderBy')) {
      params.append('orderBy', searchParams.get('orderBy')!);
    }
    if (parseInt(pageSize)) {
      params.append('pageSize', pageSize);
    }
    const query = params.size ? '?' + params.toString() : '';
    router.push(`/issues/list${query}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get('pageSize') || '10'}
      onValueChange={handlePageSelect}
    >
      <Select.Trigger placeholder="Filter by page..." />
      <Select.Content>
        {[5, 10, 20].map((pageSize) => (
          <Select.Item key={pageSize} value={pageSize.toString()}>
            {pageSize}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default PageSelect;
