export default function mapHasValue(map, value) {
    if (typeof value === "object")
        return Array.from(map).some(item => JSON.stringify(item) === JSON.stringify(value));
    else
        return Array.from(map.values()).includes(value);
}
//# sourceMappingURL=mapHasObject.js.map