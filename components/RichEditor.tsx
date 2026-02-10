type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function RichEditor({ value, onChange }: Props) {
  return (
    <textarea
      className="border p-3 w-full h-48"
      placeholder="<h1>Title</h1><p>Content</p>"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
