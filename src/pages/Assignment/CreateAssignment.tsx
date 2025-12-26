import {Button} from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {useIsMobile} from '@/hooks/use-mobile';
import {useForm, useFieldArray} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {useState} from 'react';
import {toast} from 'sonner';
import {
  CreateAssignmentAdminSchema,
  type CreateAssignmentAdminType,
} from './type';

function CreateAssignmentAdmin({trigger}: {trigger: React.ReactNode}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateAssignmentAdminType>({
    resolver: zodResolver(CreateAssignmentAdminSchema),
    defaultValues: {
      examId: '',
      title: '',
      description: '',
      categories: [],
    },
  });

  const {
    fields: categories,
    append: addCategory,
    remove: removeCategory,
  } = useFieldArray({control: form.control, name: 'categories'});

  const onSubmit = async (data: CreateAssignmentAdminType) => {
    console.log('ADMIN ASSIGNMENT PAYLOAD', data);
    toast.success('Assignment created successfully');
    setOpen(false);
    form.reset();
  };

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create Assignment (Admin)</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 overflow-y-auto">
          <Form {...form}>
            <form className="space-y-6">
              {/* Assignment Info */}
              <FormField
                control={form.control}
                name="examId"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Exam ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Categories */}
              <div className="space-y-4">
                <Button
                  type="button"
                  onClick={() =>
                    addCategory({
                      categoryId: '',
                      title: '',
                      order: categories.length + 1,
                      questions: [],
                    })
                  }>
                  + Add Category
                </Button>

                {categories.map((cat, catIndex) => (
                  <CategoryField
                    key={cat.id}
                    form={form}
                    catIndex={catIndex}
                    removeCategory={removeCategory}
                  />
                ))}
              </div>
            </form>
          </Form>
        </div>

        <DrawerFooter>
          <Button onClick={form.handleSubmit(onSubmit)} className="w-full">
            Create Assignment
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// CategoryField component to handle nested questions field array
function CategoryField({
  form,
  catIndex,
  removeCategory,
}: {
  form: ReturnType<typeof useForm<CreateAssignmentAdminType>>;
  catIndex: number;
  removeCategory: (index: number) => void;
}) {
  const {
    fields: questions,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: `categories.${catIndex}.questions`,
  });

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <Input
        placeholder="Category ID"
        {...form.register(`categories.${catIndex}.categoryId`)}
      />
      <Input
        placeholder="Category Title"
        {...form.register(`categories.${catIndex}.title`)}
      />

      <Button
        type="button"
        onClick={() =>
          append({
            question: '',
            order: questions.length + 1,
            isDocument: false,
            isInputField: true,
          })
        }>
        + Add Question
      </Button>

      {questions.map((q, qIndex) => (
        <div key={q.id} className="space-y-2 border p-3 rounded">
          <Input
            placeholder="Question text"
            {...form.register(
              `categories.${catIndex}.questions.${qIndex}.question`
            )}
          />

          <Select
            onValueChange={(val) => {
              if (val === 'document') {
                form.setValue(
                  `categories.${catIndex}.questions.${qIndex}.isDocument`,
                  true
                );
                form.setValue(
                  `categories.${catIndex}.questions.${qIndex}.isInputField`,
                  false
                );
              } else {
                form.setValue(
                  `categories.${catIndex}.questions.${qIndex}.isDocument`,
                  false
                );
                form.setValue(
                  `categories.${catIndex}.questions.${qIndex}.isInputField`,
                  true
                );
              }
            }}>
            <SelectTrigger>
              <SelectValue placeholder="Question Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text Input</SelectItem>
              <SelectItem value="document">Document Upload</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="destructive"
            type="button"
            onClick={() => remove(qIndex)}>
            Remove Question
          </Button>
        </div>
      ))}

      <Button
        variant="destructive"
        type="button"
        onClick={() => removeCategory(catIndex)}>
        Remove Category
      </Button>
    </div>
  );
}

export default CreateAssignmentAdmin;
