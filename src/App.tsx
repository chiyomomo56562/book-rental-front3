import DefaultLayout from './shared/ui/Layout/DefaultLayout';
import Button from './shared/ui/Button/Button';

function App() {
  return (
    <DefaultLayout>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Welcome to the Book Rental System</h2>
        <p>This is the shared infrastructure setup step.</p>
        <div className="flex gap-2">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="danger">Danger Button</Button>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default App;
