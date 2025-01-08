export default function mapHasValue<Key, Value>(
  map: Map<Key, Value>,
  value: Value
) {
  if (typeof value === "object")
    return Array.from(map).some(
      item => JSON.stringify(item[1]) === JSON.stringify(value)
    );
  else return Array.from(map.values()).includes(value);
}
