export default function mapHasValue(map, value) {
    if (typeof value === "object")
        return Array.from(map).some(item => JSON.stringify(item[1]) === JSON.stringify(value));
    else
        return Array.from(map.values()).includes(value);
}
//# sourceMappingURL=mapHasValue.js.map