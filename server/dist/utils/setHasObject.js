export default function mapHasObject(set, obj) {
    return Array.from(set).some(item => JSON.stringify(item) === JSON.stringify(obj));
}
//# sourceMappingURL=setHasObject.js.map