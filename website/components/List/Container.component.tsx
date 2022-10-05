interface ContainerProps<T> {
  item: (props: T, index: number) => JSX.Element;
  items: Array<T>;
}

export function Container<T>({ item: Component, items }: ContainerProps<T>) {
  return (
    <ul role='list' className='flex flex-col space-y-4'>
      {items.map((item, index) => (
        <Component key={index} index={index} {...item} />
      ))}
    </ul>
  );
}
