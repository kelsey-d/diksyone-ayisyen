import { Card } from "./ui/card";

export function ChallengeSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl text-white text-center">Defye</h2>
      
      <Card className="bg-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🐝</div>
          <div>
            <div className="font-medium text-slate-800">Spelling Bee</div>
            <div className="text-sm text-slate-600">Koute mo a epi tape li</div>
          </div>
        </div>
      </Card>
    </div>
  );
}